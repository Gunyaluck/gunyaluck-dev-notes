/** Badge สีแดงมุมกระดิ่ง — แสดงจำนวนที่ยังไม่อ่าน (สูงสุด 99+) */
export function NotificationCountBadge({ count }) {
  if (count < 1) return null;
  const label = count > 99 ? "99+" : String(count);
  return (
    <span
      className="pointer-events-none absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-semibold leading-none text-white"
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
