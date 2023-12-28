export default function WidthWrapper({
  children,
  customStyle,
}: {
  children: React.ReactNode;
  customStyle: string;
}) {
  return (
    <div className="w-full flex justify-center">
      <div className={`${customStyle} w-full px-3`}>{children}</div>
    </div>
  );
}
