import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

 export  default function CarsSkeleton() {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full bg-muted">
                <Skeleton className="h-full w-full" />
            </div>
            <CardHeader>
                <Skeleton className="w-1/2 h-6 mb-2" />
                <Skeleton className="w-1/4 h-4" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-24 h-4" />
                </div>
                <Skeleton className="w-full h-4 mt-2" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-16 h-4" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-24 h-4" />
            </CardFooter>
        </Card>
    );
}