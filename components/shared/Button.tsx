
interface ButtonProps {
  children: React.ReactNode
  type: 'primary' | 'secondary' | 'danger' | 'success'
  classesWrapper?: string
  handleClick: (a: any) => void
}

export default function Button({ children, handleClick, type, classesWrapper="" }: ButtonProps) {
  let classes;
  
  switch (type) {
    case 'primary':
      classes = 'bg-foreground text-background hover:bg-neutral-600  ';
      break;
  
    case 'secondary':
      classes = 'text-foreground hover:bg-btn-background-hover ';
      break;
  
    case 'danger':
      classes = 'bg-red-900 text-foreground hover:bg-red-950';
      break;
  
    default:
      classes = '';
      break;
  }

  return (

    <button
      className={`py-2 px-3 flex rounded-md no-underline border w-fit ${classes} ${classesWrapper}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
