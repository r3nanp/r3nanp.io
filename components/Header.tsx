import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function NavItem({
  href,
  text,
  isActive,
}: {
  href: string;
  text: string;
  isActive: boolean;
}) {
  return (
    <Link href={href}>
      <a
        className={clsx(
          isActive
            ? "font-semibold text-gray-200"
            : "font-normal text-gray-400",
          "hidden rounded-lg p-1 transition-all hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block"
        )}
      >
        <span className="capitalize">{text}</span>
      </a>
    </Link>
  );
}

const ITEMS = [
  {
    key: "1",
    href: "/",
    text: "Home",
  },
  // {
  //   key: "2",
  //   href: "/blog",
  //   text: "Blog",
  // },
];

export const Header = () => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const openMenu = () => setMenu(true);
  const closeMenu = () => setMenu(false);

  const isActive = (navItem: typeof ITEMS[0]) => router.asPath === navItem.href;

  useEffect(() => {
    router.events.on("routeChangeStart", closeMenu);
    router.events.on("routeChangeComplete", closeMenu);
    router.events.on("routeChangeError", closeMenu);

    return () => {
      router.events.off("routeChangeStart", closeMenu);
      router.events.off("routeChangeComplete", closeMenu);
      router.events.off("routeChangeError", closeMenu);
    };
  }, [router.events]);

  return (
    <header className="flex items-center justify-between p-8">
      <nav className="relative mx-auto hidden w-full max-w-2xl items-center justify-between border-gray-700 bg-gray-900 bg-opacity-60 pt-8 pb-8 text-gray-100 sm:pb-16 lg:flex">
        <div className="ml-[-0.60rem]">
          {ITEMS.map((item) => (
            <NavItem {...item} key={item.key} isActive={isActive(item)} />
          ))}
        </div>
      </nav>
    </header>
  );
};