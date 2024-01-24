import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

interface TitleProps {
  initialData: Doc<'documents'>;
}

const Title = ({ initialData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>(initialData.title || 'Untitled');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const update = useMutation(api.documents.update);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({
      id: initialData._id,
      title: e.target.value || 'Untitled',
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') disableInput();
  };

  return (
    <div>
      {initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className='h-7 px-2 focus-visible:ring-transparent'
        />
      ) : (
        <Button
          onClick={enableInput}
          variant='ghost'
          size='sm'
          className='font-normal h-auto p-1'
        >
          <span className='truncate'>{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;
