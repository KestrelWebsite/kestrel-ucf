
export interface ShowcaseEvent {
    title: string;
    date: string;
    folder: string;
    images: string[];
  }
  
  export const SHOWCASE_EVENTS: ShowcaseEvent[] = [
    {
        title: "Blue Origin Tour",
        date: "August 10, 2025",
        folder: "august10",
        images: [
          "/showcase/august10/photo1.jpg",
          "/showcase/august10/photo2.jpg",
          "/showcase/august10/photo3.jpg",
        ],
      },
    {
      title: "Team Meeting",
      date: "July 14, 2025",
      folder: "july14",
      images: [
        "/showcase/july14/photo1.jpg",
        "/showcase/july14/photo2.jpg",
        "/showcase/july14/photo3.jpg",
      ],
    },
    {
        title: "Team Meeting",
        date: "May 7, 2025",
        folder: "may7",
        images: [
          "/showcase/may7/photo1.png",
          "/showcase/may7/photo2.jpg",
          "/showcase/may7/photo3.png",
        ],
      },
  ];
  