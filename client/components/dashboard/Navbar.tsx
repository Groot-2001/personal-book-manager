"use client";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  LogOut,
} from "lucide-react";
import {useAuth} from "@/hooks/useAuth";

export default function Navbar() {
  const router = useRouter();
  const {user, logout} = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleLogout() {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-600 p-2 shadow-sm">
            <BookOpen className="h-5 w-5 text-white" />
          </div>

          <span className="text-lg font-semibold tracking-tight">
            BookShelf
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="
                flex
                items-center
                gap-2
                rounded-full
                p-1
                transition
                hover:bg-slate-100
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-emerald-500
                  to-teal-500
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {initials}
              </div>

              <span className="hidden lg:block text-sm font-medium">
                {user?.name?.split(" ")[0]}
              </span>

              <ChevronDown className="hidden lg:block h-4 w-4 text-slate-400" />
            </button>

            {open && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-64
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  shadow-xl
                "
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-r
                        from-emerald-500
                        to-teal-500
                        font-semibold
                        text-white
                      "
                    >
                      {initials}
                    </div>

                    <div>
                      <p className="font-medium">
                        {user?.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <hr />

                <button
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    transition
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
