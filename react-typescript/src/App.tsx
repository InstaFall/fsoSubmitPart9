// type declaration for Header
type HeaderProps = {
  courseName: string;
};

// Header component
const Header = ({ courseName }: HeaderProps) => {
  return <h1>{courseName}</h1>;
};

// type declaration for Content
type ContentProps = {
  courseParts: CoursePart[];
};

// Content component
const Content = ({ courseParts }: ContentProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  type PartProps = {
    coursePart: CoursePart;
  };

  const Part = ({ coursePart }: PartProps) => {
    switch (coursePart.kind) {
      case "basic":
        return (
          <div style={{ marginBottom: "1rem" }}>
            <div>
              <b>
                {coursePart.name} {coursePart.exerciseCount}
              </b>
            </div>
            <div>{coursePart.description}</div>
          </div>
        );
      case "group":
        return (
          <div style={{ marginBottom: "1rem" }}>
            <div>
              <b>
                {coursePart.name} {coursePart.exerciseCount}
              </b>
            </div>
            <div>Group projects {coursePart.groupProjectCount}</div>
          </div>
        );
      case "background":
        return (
          <div style={{ marginBottom: "1rem" }}>
            <div>
              <b>
                {coursePart.name} {coursePart.exerciseCount}
              </b>
            </div>
            <div>{coursePart.description}</div>
            <div>{coursePart.backgroundMaterial}</div>
          </div>
        );
      case "special":
        return (
          <div style={{ marginBottom: "1rem" }}>
            <div>
              <b>
                {coursePart.name} {coursePart.exerciseCount}
              </b>
            </div>
            <div>{coursePart.description}</div>
            <div>Required: {coursePart.requirements.join(", ")}</div>
          </div>
        );
      default:
        return assertNever(coursePart);
    }
  };
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </div>
  );
};

// type declaration for Total
type TotalProps = {
  courseParts: { name: string; exerciseCount: number }[];
};

// Total component
const Total = ({ courseParts }: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((prev, part) => prev + part.exerciseCount, 0)}
    </p>
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

// App component
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
