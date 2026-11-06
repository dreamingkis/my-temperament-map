export function BrandHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <img
          src="/logo-basic.png"
          alt="비스타"
          width={1000}
          height={308}
          className="h-[27px] w-auto"
        />
        <a
          href="https://www.bestar.kr/toolkit/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          비스타 툴킷
        </a>
      </div>
    </header>
  );
}