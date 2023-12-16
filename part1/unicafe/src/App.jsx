import { useEffect, useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Stat = ({ text, number }) => {
  return (
    <table style={{ borderCollapse: "collapse", width: "200px" }}>
      <tbody>
        <tr>
          <td style={{ width: "120px", paddingRight: "10px" }}>{text}</td>
          <td>{number}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all == 0) {
    return <h3>No feedback given</h3>;
  }

  return (
    <div>
      <h2>statistics</h2>
      <Stat text="good" number={good} />
      <Stat text="neutral" number={neutral} />
      <Stat text="bad" number={bad} />
      <Stat text="all" number={all} />
      <Stat text="average" number={average} />
      <Stat text="positive" number={positive + "%"} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
  };

  useEffect(() => {
    const total = good + neutral + bad;
    setAll(total || 0);
  }, [good, neutral, bad]);

  useEffect(() => {
    if (all === 0) {
      setAverage(0);
    } else {
      const avg = (good - bad) / all;
      setAverage(avg.toFixed(2));
    }
  }, [good, bad, all]);

  useEffect(() => {
    if (all === 0) {
      setPositive(0);
    } else {
      const pos = (good / all) * 100;
      setPositive(pos.toFixed(2));
    }
  }, [good, all]);

  return (
    <div>
      <div>
        <h2>Give feedback below</h2>
        <Button handleClick={handleClickGood} text="good" />
        <Button handleClick={handleClickNeutral} text="neutral" />
        <Button handleClick={handleClickBad} text="bad" />
      </div>

      <br />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
