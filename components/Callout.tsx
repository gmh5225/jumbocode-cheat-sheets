export default function Callout(props: { content: React.ReactNode }) {
  return (
    <div className="border border-gray-950/10 bg-gray-950/5 px-4">
      {props.content}
    </div>
  );
}
