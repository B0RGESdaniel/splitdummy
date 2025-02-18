import emptyBox from '../../assets/empty-box.svg';

type EmptyListProps = {
  text: string
}
export function EmptyList({ text }:EmptyListProps) {
  return (
    <div className="w-full h-1/2 flex text-sm flex-col gap-4 text-zinc-400 items-center justify-center text-center">
      <img src={emptyBox} alt="empty box" />
      <span>{text}</span>
    </div>
  )
}