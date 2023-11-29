import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, ChevronUp, LucideIcon } from "lucide-react";
import React from "react";

interface ItemProps {
  id: Id<"documents">;
  documentIcon: string;
  active: boolean;
  expanded: boolean;
  isSearch: boolean;
  level: number;
  label: string;
  icon: LucideIcon;
  onExpand: () => void;
  onClick: () => void;
}

const Item = ({
  id,
  icon: Icon,
  label,
  onClick,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: Partial<ItemProps>) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      role="button"
      onClick={onClick}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium ",
        active && "bg-primary/5 text-primary"
      )}
    >
      {id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          onClick={(e) => {
            e.stopPropagation();
            onExpand?.();
          }}
        >
          <ChevronIcon className="h-4 w-4 shink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        Icon && (
          <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
        )
      )}

      <span className=" truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 fot-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">CTRL</span>K
        </kbd>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
