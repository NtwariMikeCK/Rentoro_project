import { useState } from "react";
import {
  Car,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CarDataType } from "@/types/carType";
import { useMutation } from "@tanstack/react-query";
import request from "@/utils/axios";
import { toast } from "react-toastify";

interface CarCardProps {
  car: CarDataType;
  onValidationChange?: (id: string, isValidated: boolean) => Promise<void>;
  refetch: () => void;
}

export function CarCard({ car, refetch }: CarCardProps) {
  const [isValidated, setIsValidated] = useState(car.isValidated);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async () =>
      await request.post(`/admin/validations/${car.id}`, {
        approved: true,
      }),
    onSuccess: async () => {
      setIsValidated(!isValidated);
      setIsDialogOpen(!isDialogOpen);
      refetch();
    },
    onError: () => {
      toast.error("Error validating car");
    },
  });

  const formattedDate = new Date(car.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full bg-muted">
        {car &&
        car.imageUrls &&
        Array.isArray(car.imageUrls) &&
        car.imageUrls.length > 0 ? (
          <Image
            src={car?.imageUrls?.[0] ? car.imageUrls[0] : "/placeholder.svg"}
            alt={`${car?.make || "Unknown"} ${car?.model || "Car"}`}
            fill
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Car className="h-16 w-16 text-muted-foreground/50" />
          </div>
        )}

        <div className="absolute right-2 top-2">
          <Badge variant={car.isAvailable ? "default" : "destructive"}>
            {car.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">
              {car.year} {car.make} {car.model}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" />
              {car.location}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 text-lg font-semibold">
            <DollarSign className="h-4 w-4" />
            {car.dailyRate}
            <span className="text-sm font-normal text-muted-foreground">
              /day
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-0.5">
              {car.color}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-0.5">
              {car.licensePlate}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {car.description}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Updated: {formattedDate}
          </div>
          <div className="flex items-center gap-2">
            <span>Validated:</span>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Switch
                  className={"bg-black"}
                  checked={isValidated}
                  disabled={isLoading}
                />
              </AlertDialogTrigger>
              <AlertDialogContent className={""}>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {isValidated ? "Invalidate" : "Validate"} this vehicle?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {isValidated
                      ? "This will mark the vehicle as not validated and it may be hidden from search results."
                      : "This will mark the vehicle as validated and it will appear in search results."}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(event) => {
                      event.preventDefault();
                      mutate();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Confirm"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
        <div className="flex items-center gap-1 text-sm">
          {isValidated ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span>{isValidated ? "Validated" : "Not Validated"}</span>
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
