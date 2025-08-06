"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PiCheck, PiWebcam, PiX } from "react-icons/pi";

type tCourse = {
  slug: string;
  isLive: boolean;
  updated: string | null;
  lessons: {
    slug: string;
    lessonLives: {
      timestamp: string;
    }[];
    lessonDescriptions: {
      title: string;
    }[];
  }[];
  courseDescriptions: {
    title: string;
    description: string;
  }[];
};

export default function Client({ courses }: { courses: tCourse[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [c] = useState<tCourse[]>(courses);
  const [fltLive, setFltLive] = useState<boolean | undefined>(undefined);
  const [fltSecond, setFltSecond] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const searchParamLive = searchParams.get("live");
    setFltLive(
      searchParamLive == null ? undefined : searchParamLive === "true"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onItem = "bg-primary";
  const offItem = "";
  const defaultItem = "border rounded-xl p-1 box-content text-lg shadow-sm";

  const makeQuery = (name: string, v: boolean | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (v === undefined) {
      params.delete(name);
    } else {
      params.set(name, v.toString());
    }
    return params.toString();
  };

  const hFlt = (v: boolean | undefined) => {
    router.push(pathname + "?" + makeQuery("live", v));
    setFltLive(v);
  };
  const hSecond = (v: boolean | undefined) => {
    router.push(pathname + "?" + makeQuery("second", v));
    setFltSecond(v);
  };

  return (
    <>
      <div className="flex gap-1">
        <PiX
          onClick={() => hFlt(false)}
          className={cn(fltLive == false ? onItem : offItem, defaultItem)}
        />
        <PiWebcam
          onClick={() => hFlt(undefined)}
          className={cn(fltLive == undefined ? onItem : offItem, defaultItem)}
        />
        <PiCheck
          onClick={() => hFlt(true)}
          className={cn(fltLive == true ? onItem : offItem, defaultItem)}
        />
      </div>
      <div className="flex gap-1">
        <PiX
          onClick={() => hSecond(false)}
          className={cn(fltSecond == false ? onItem : offItem, defaultItem)}
        />
        <PiWebcam
          onClick={() => hSecond(undefined)}
          className={cn(fltSecond == undefined ? onItem : offItem, defaultItem)}
        />
        <PiCheck
          onClick={() => hSecond(true)}
          className={cn(fltSecond == true ? onItem : offItem, defaultItem)}
        />
      </div>
      <div>
        {c
          .filter((c) => {
            return fltLive == undefined ? c : c.isLive == fltLive;
          })
          .map((course, i) => (
            <Link href={`/courses/${course.slug}`} key={i}>{course.courseDescriptions[0].title}</Link>
          ))}
      </div>
      <details>
        <pre>{JSON.stringify(c, null, 2)}</pre>
      </details>
    </>
  );
}
