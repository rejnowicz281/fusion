import { Skeleton } from "@/components/ui/skeleton";

const PromptsSkeleton = () => {
    return (
        <>
            <Skeleton className="h-10 w-3/5 bg-[rgb(197,210,228)]" />
            <Skeleton className="h-10 w-4/5 bg-[rgb(197,210,228)]" />
            <Skeleton className="h-10 w-2/5 bg-[rgb(197,210,228)]" />
        </>
    );
};

export default PromptsSkeleton;
