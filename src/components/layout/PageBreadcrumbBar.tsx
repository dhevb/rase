import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

type BreadcrumbItem = { name: string; path: string };

type Props = {
  items: readonly BreadcrumbItem[];
  className?: string;
  innerClassName?: string;
};

export default function PageBreadcrumbBar({
  items,
  className = "border-b border-brand-navy/10 bg-white",
  innerClassName = "mx-auto max-w-6xl px-4 py-5 md:px-8",
}: Props) {
  return (
    <div className={className}>
      <div className={innerClassName}>
        <BreadcrumbNav
          items={items.map((item, index, arr) => ({
            label: item.name,
            href: index < arr.length - 1 ? item.path : undefined,
          }))}
        />
      </div>
    </div>
  );
}
