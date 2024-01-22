import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation } from 'convex/react';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

interface ItemProps {
  id: Id<'documents'>;
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
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const router = useRouter();
  const { user } = useUser();

  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;

    const promise = create({ title: 'Untitled', parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/document/${documentId}`);
        toast.promise(promise, {
          loading: 'Creating a new note...',
          success: 'New note created!',
          error: 'Failed to create a new note!',
        });
      }
    );
  };

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;
    const promise = archive({ id });

    toast.promise(promise, {
      loading: 'Moving to trash',
      success: 'Note moved to trash!',
      error: 'Failed to arhive note',
    });
  };
  return (
    <div
      role='button'
      onClick={onClick}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
      }}
      className={cn(
        'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium ',
        active && 'bg-primary/5 text-primary'
      )}
    >
      {id && (
        <div
          role='button'
          className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1'
          onClick={(e) => {
            e.stopPropagation();
            onExpand?.();
          }}
        >
          <ChevronIcon className='h-4 w-4 shink-0 text-muted-foreground/50' />
        </div>
      )}
      {documentIcon ? (
        <div className='shrink-0 mr-2 text-[18px]'>{documentIcon}</div>
      ) : (
        Icon && (
          <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
        )
      )}

      <span className='truncate'>{label}</span>
      {isSearch && (
        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 fot-mono text-[10px] font-medium text-muted-foreground'>
          <span className='text-xs'>CTRL</span>K
        </kbd>
      )}
      {id && (
        <div className='ml-auto flex items-center gap-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role='button'
                className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground'
              >
                <MoreHorizontal className='w-4 h-4 text-muted-foreground' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-60'
              align='start'
              side='right'
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className='text-xs text-muted-foreground'>
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600'
            onClick={onCreate}
            role='button'
          >
            <Plus className='h-4 w-4 text-muted-foreground' />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
      }}
      className='flex gap-x-2 py-[3px]'
    >
      <Skeleton className='h-4 w-4' />
      <Skeleton className='h-4 w-[30%]' />
    </div>
  );
};

export default Item;
