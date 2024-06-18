import { AlertCircle } from "lucide-react";



export const FormError = ({message} : {message?: string}) => {
    if(!message) return null;

    return (
        <div className="bg-destructive flex gap-2 my-2 text-xs font-medium items-center text-secondary-foreground p-3 rounded-md ">
            <AlertCircle className="w-4 h-4" />
            <p>{message}</p>
        </div>
    )
}