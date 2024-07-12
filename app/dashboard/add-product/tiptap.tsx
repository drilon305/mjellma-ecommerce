'use client'

import { Toggle } from '@/components/ui/toggle'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic } from 'lucide-react'

const Tiptap = ({ val }: {val: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
        attributes: {
            class: 'min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        }
    },
    content: val,
  })

  return (
    <div className='flex flex-col gap-2'>
        {editor && (
            <div className='border-input border rounded-md'>
               <Toggle pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()} size={'sm'}>
                <Bold className='w-4 h-4' />
                </Toggle> 
                <Toggle pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()} size={'sm'}>
                <Italic className='w-4 h-4' />
                </Toggle> 
            </div>
        )}
  <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
