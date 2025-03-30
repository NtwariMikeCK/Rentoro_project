export default function NotFound({ statement }: { statement: string }) {
  return (
    <div className="text-center w-full flex justify-center items-center flex-col gap-5">
      <h1 className="font-bold text-3xl">Rentoro</h1>
      <p className="font-bold text-3xl text-primaryGray capitalize">
        {statement}
      </p>
    </div>
  );
}
