import { Skeleton } from "@/components/ui/skeleton";

const PromptsSkeleton = () => {
    return (
        <>
            <Skeleton className="h-10 w-1/3 bg-[rgb(197,210,228)]" />
            <Skeleton className="h-10 w-1/2 bg-[rgb(197,210,228)]" />
            <Skeleton className="h-10 w-1/4 bg-[rgb(197,210,228)]" />
        </>
    );
};

export default PromptsSkeleton;
