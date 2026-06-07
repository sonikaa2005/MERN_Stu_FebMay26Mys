const courses = [
  {
    id: 1,
    title: "MERN stack",
    instructor: "Rakesh",
    category: "Programming",
    level: "Beginner",
    status: true,
    totalNumber: 3,
    lessons: [
      {
        name: "React.js",
        notes: "React is a JavaScript library for building user interfaces. Key concepts: JSX, Components, Props, State, Hooks (useState, useEffect), Virtual DOM.",
        videoLink: "https://www.youtube.com/watch?v=bMknfKXIFA8"
      },
      {
        name: "Express.js",
        notes: "Express is a minimal Node.js web framework. Covers: Routing, Middleware, Request/Response cycle, REST API creation.",
        videoLink: "https://www.youtube.com/watch?v=L72fhGm1tfE"
      },
      {
        name: "Node.js",
        notes: "Node.js is a JavaScript runtime built on Chrome's V8 engine. Topics: Event loop, Modules, NPM, File System, Streams.",
        videoLink: "https://www.youtube.com/watch?v=TlB_eWDSMt4"
      }
    ]
  },
  {
    id: 2,
    title: "Node.js",
    instructor: "Sonu",
    category: "Backend",
    level: "Intermediate",
    status: false,
    totalNumber: 4,
    lessons: [
      {
        name: "Modules",
        notes: "Node.js module system: CommonJS (require/module.exports), ES Modules (import/export), built-in modules like fs, path, os.",
        videoLink: "https://www.youtube.com/watch?v=xHLd36QoS4k"
      },
      {
        name: "Buffer",
        notes: "Buffers handle binary data in Node.js. Used with streams and file I/O. Methods: alloc, from, toString, slice.",
        videoLink: "https://www.youtube.com/watch?v=qiuW6eTcWYY"
      },
      {
        name: "Events",
        notes: "EventEmitter class allows creating and handling custom events. Pattern: on(), emit(), once(), removeListener().",
        videoLink: "https://www.youtube.com/watch?v=NtrnaTKXuZs"
      },
      {
        name: "File System",
        notes: "The fs module provides an API to interact with the file system. Covers: readFile, writeFile, appendFile, unlink, mkdir (sync and async).",
        videoLink: "https://www.youtube.com/watch?v=U57kU311-nE"
      }
    ]
  },
  {
    id: 3,
    title: "HTML & CSS",
    instructor: "Anu",
    category: "Web Development",
    level: "Beginner",
    status: true,
    totalNumber: 4,
    lessons: [
      {
        name: "HTML Tags",
        notes: "HTML provides structure to web pages. Key tags: headings (h1-h6), paragraphs, links, images, lists, tables, forms, semantic elements (header, footer, section, article).",
        videoLink: "https://www.youtube.com/watch?v=UB1O30fR-EE"
      },
      {
        name: "CSS Basics",
        notes: "CSS styles HTML elements. Topics: selectors, box model, colors, typography, display properties (block, inline, inline-block), positioning.",
        videoLink: "https://www.youtube.com/watch?v=yfoY53QXEnI"
      },
      {
        name: "Grid",
        notes: "CSS Grid is a two-dimensional layout system. Key properties: grid-template-columns/rows, grid-area, gap, justify/align items and content.",
        videoLink: "https://www.youtube.com/watch?v=jV8B24rSN5o"
      },
      {
        name: "Flexbox",
        notes: "Flexbox is a one-dimensional layout model. Properties: flex-direction, justify-content, align-items, flex-wrap, flex-grow/shrink/basis.",
        videoLink: "https://www.youtube.com/watch?v=fYq5PXgSsbE"
      }
    ]
  },
  {
    id: 4,
    title: "Python",
    instructor: "Saara",
    category: "Programming",
    level: "Beginner",
    status: false,
    totalNumber: 3,
    lessons: [
      {
        name: "Syntax",
        notes: "Python syntax basics: indentation, variables, data types (int, float, str, bool, list, tuple, dict, set), print(), input(), comments.",
        videoLink: "https://www.youtube.com/watch?v=rfscVS0vtbw"
      },
      {
        name: "Loops",
        notes: "Python loops: for loop (range, enumerate, zip), while loop, break, continue, pass, list comprehension, nested loops.",
        videoLink: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ"
      },
      {
        name: "Functions",
        notes: "Functions in Python: def keyword, parameters, default arguments, *args, **kwargs, return statement, lambda functions, scope (local/global).",
        videoLink: "https://www.youtube.com/watch?v=9Os0o3wzS_I"
      }
    ]
  }
];

module.exports = courses;
