import { Button } from "../common/Button";
import { LoadingSpinner } from "../common/LoadingSpinner";

export function ViewMoreButton({ onLoadMore, isLoading = false }) {
    return (
        <div className="w-full flex justify-center pt-20 lg:col-span-2">
            <Button
                variant="text"
                onClick={onLoadMore}
                disabled={isLoading}
            >
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <span className="underline">View more</span>
                )}
            </Button>
        </div>
    );
}