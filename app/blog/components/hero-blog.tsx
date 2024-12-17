import { SelectBlog } from "@/db/schema";
import { HeroCard } from './herocard'; // Changed to named import

export const HeroBlog = ({ recentPosts }: { recentPosts: SelectBlog[] }) => {
  return (
    <div className="flex mb-8 p-4 rounded-lg ">
      <div className="w-1/2 h-full pr-2">
        <HeroCard post={recentPosts[0]} type="main" /> {/* Most recent post */}
      </div>
      <div className="w-1/2 flex flex-col gap-2">
        <div className="h-2/3">
          <HeroCard post={recentPosts[1]} type="secondary" /> {/* Second post */}
        </div>
        <div className="h-1/3">
          <HeroCard post={recentPosts[2]} type="tertiary" /> {/* Third post */}
        </div>
      </div>
    </div>
  );
}; 