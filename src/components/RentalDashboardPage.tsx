import { RentalRequest } from "@/types/carType";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import requestAxios from "@/utils/axios";

/*
 * RentalRequestStatus is an enum that represents the status of a rental
 * request
 * PENDING - The request is pending approval
 * APPROVED - The request has been approved
 * REJECTED - The request has been rejected
 * CANCELLED - The request has been cancelled
 * COMPLETED - The request has been completed
 * */
export enum RentalRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export default function RentalPageDashboard({
  request,
  refetch,
}: {
  request: RentalRequest;
  refetch: () => void;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: async (status: string) =>
      await requestAxios.patch(`/rental-requests/${request?.id}`, {
        startDate: request.startDate,
        endDate: request.endDate,
        status: status,
      }),
    onSuccess: async () => {
      refetch();
      toast.success("Success changing status");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error validating car");
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };
  return (
    <div>
      <div key={request.id} className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Client Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Client Information</h2>
            <p className="text-gray-600">
              {request.client.firstName} {request.client.lastName}
            </p>
            <p className="text-gray-600">{request.client.email}</p>
          </div>

          {/* Car Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Vehicle Information</h2>
            <p className="text-gray-600">
              {request.car.year} {request.car.make} {request.car.model}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rental Details */}
          <div>
            <p className="text-sm text-gray-500">
              Start: {formatDate(request.startDate)}
            </p>
            <p className="text-sm text-gray-500">
              End: {formatDate(request.endDate)}
            </p>
          </div>

          {/* Status & Cost */}
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${statusColors[request.status as keyof typeof statusColors]}`}
            >
              {request.status}
            </span>
            <p className="font-medium">Total: ${request?.totalCost}</p>
          </div>

          {/* Metadata */}
          <div>
            <p className="text-sm text-gray-500">
              Requested: {formatDate(request.createdAt)}
            </p>{" "}
          </div>
          {/* Approve & Reject Buttons */}
          {request.status === "PENDING" && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => mutate(RentalRequestStatus.APPROVED)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Approve"}
              </button>
              <button
                onClick={() => mutate(RentalRequestStatus.REJECTED)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Reject"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
