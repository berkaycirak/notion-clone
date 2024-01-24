import React from 'react';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { MenuIcon } from 'lucide-react';
import Title from './Title';
interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<'documents'>,
  });

  if (!document) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <nav className=' bg-background px-3 py-2 flex items-center w-full gap-x-4'>
        {isCollapsed && (
          <MenuIcon
            role='button'
            onClick={onResetWidth}
            className='w-6 h-6 text-muted-foreground'
          />
        )}
        <div className='flex items-center justify-between w-full'>
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
