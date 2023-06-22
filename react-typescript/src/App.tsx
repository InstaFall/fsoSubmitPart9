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
  courseParts: { name: string; exerciseCount: number }[];
};

// Content component
const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
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
      Number of exercises{' '}
      {courseParts.reduce((prev, part) => prev + part.exerciseCount, 0)}
    </p>
  );
};

// App component
const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
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