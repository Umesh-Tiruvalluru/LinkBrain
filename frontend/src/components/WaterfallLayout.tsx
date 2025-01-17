import React, { ReactNode, useEffect, useState } from "react";

interface WaterfallLayoutProps {
  children: ReactNode;
  gap?: number;
}

interface BreakpointConfig {
  breakpoint: number;
  columns: number;
}

const breakpoints: BreakpointConfig[] = [
  { breakpoint: 640, columns: 1 }, // sm
  { breakpoint: 1024, columns: 2 }, // lg
  { breakpoint: 1280, columns: 3 }, // xl
  { breakpoint: Infinity, columns: 4 },
];

const WaterfallLayout: React.FC<WaterfallLayoutProps> = ({
  children,
  gap = 16,
}) => {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateColumns = (): void => {
      const width = window.innerWidth;
      const config = breakpoints.find((bp) => width < bp.breakpoint);
      setColumns(config?.columns ?? 4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const distributeItems = (): ReactNode[][] => {
    // Create array of empty arrays with explicit typing
    const cols: ReactNode[][] = Array.from({ length: columns }, () => []);

    // Convert children to array and distribute
    const childrenArray = React.Children.toArray(children);
    childrenArray.forEach((child, index) => {
      const columnIndex = index % columns;
      cols[columnIndex].push(child);
    });

    return cols;
  };

  const columnWidth = () => {
    switch (columns) {
      case 1:
        return "w-full";
      case 2:
        return "w-full sm:w-1/2";
      case 3:
        return "w-full sm:w-1/2 lg:w-1/3";
      case 4:
        return "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4";
      default:
        return "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4";
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap" style={{ margin: `0 -${gap / 2}px` }}>
        {distributeItems().map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={columnWidth()}
            style={{ padding: `0 ${gap / 2}px` }}
          >
            <div className="flex flex-col" style={{ gap: `${gap}px` }}>
              {column}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterfallLayout;
