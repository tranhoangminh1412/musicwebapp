import * as React from "react";

import ColProgress from "@/assets/icons/ColProgress";
import Indicator from "@/assets/icons/IcIndicator";

export interface ICreatePlaylistProgressProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreatePlaylistProgress(
  props: ICreatePlaylistProgressProps
) {
  const { page, setPage } = props;

  return (
    <div className="flex">
      <Indicator
        onClick={() => setPage(1)}
        status={page > 1 ? "completed" : "selected"}
      />
      <ColProgress activated={page > 1 ? true : false} />
      <Indicator
        status={
          page > 1 ? (page == 2 ? "selected" : "completed") : "unselected"
        }
        onClick={() => setPage(2)}
      />
      <ColProgress activated={page > 2 ? true : false} />
      <Indicator
        onClick={() => setPage(3)}
        status={page > 2 ? "selected" : "unselected"}
      />
    </div>
  );
}
