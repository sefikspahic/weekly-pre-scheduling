
import styled from "styled-components";
import { useState } from "react";
const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const HOUR_MARGIN_TOP = 20;
const HOUR_BOX_HEIGHT = 30;

function getMonday() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const monday = new Date(today.setDate(first));
  return monday;
}

const getDate = (start, index) => {
  return new Date(start.setDate(start.getDate() + index));
};

export const areDatesOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export default function Schedule () {
  const [events, setEvents] = useState([
    { date: new Date(2022, 11, 20, 10), text: "first hi", howLong: 3 },
    { date: new Date(2022, 11, 22, 15), text: "second", howLong: 2 },
    { date: new Date(2022, 11, 27, 11), text: "third", howLong: 2 },
    { date: new Date(2023, 0, 2, 13), text: "forth", howLong: 2 }
  ]);
  const [mondayDate, setMondayDate] = useState(getMonday(new Date()));

  const hour_now = new Date().getHours();
  const min_now = new Date().getMinutes();

  const nextWeek = () => {
    setMondayDate(getDate(new Date(mondayDate), 7));
  };
  const prevWeek = () => {
    setMondayDate(getDate(new Date(mondayDate), -7));
  };

  const addEvent = (date) => {
    const text = prompt("text");
    const from = prompt("from");
    const to = prompt("to");

    if (text && from && to) {
      setEvents([
        ...events,
        { date: new Date(date.setHours(from)), text, howLong: to - from }
      ]);
    }
  };

  return (
    <>
      <FlexBox>
        <p>
          <b>today</b> {new Date().toDateString()}
        </p>
        <p>
          <b>from</b> {mondayDate.toDateString()}
        </p>
        <p>
          <b>to</b> &nbsp;
          {new Date(
            new Date(mondayDate).setDate(mondayDate.getDate() + 6)
          ).toDateString()}
        </p>
        <button onClick={prevWeek}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <button onClick={nextWeek}>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </FlexBox>
      <Wrapper>
        <HGrid first={"30px"} cols={1}>
          <VGrid rows={24}>
            {[...Array(24).keys()].map((day) => (
              <Hour>{String(day).padStart(2, 0)}</Hour>
            ))}
          </VGrid>
          <HGrid cols={7}>
            {DAYS.map((d, i) => (
              <DayVWrapper
                isToday={areDatesOnSameDay(
                  getDate(new Date(mondayDate), i),
                  new Date()
                )}
                onClick={() => addEvent(getDate(new Date(mondayDate), i))}
              >
                <p>{d}</p>

                {events.map(
                  (event) =>
                    areDatesOnSameDay(
                      getDate(new Date(mondayDate), i),
                      event.date
                    ) && (
                      <Event
                        height={event.howLong}
                        fromTop={
                          event.date.getHours() * HOUR_BOX_HEIGHT +
                          HOUR_MARGIN_TOP +
                          HOUR_BOX_HEIGHT / 2 +
                          event.date.getMinutes() / 2
                        }
                      >
                        {event.text}
                      </Event>
                    )
                )}
              </DayVWrapper>
            ))}
          </HGrid>
        </HGrid>
        <HourLine
          fromTop={
            hour_now * HOUR_BOX_HEIGHT +
            HOUR_MARGIN_TOP +
            HOUR_BOX_HEIGHT / 2 +
            min_now / 2
          }
        />
      </Wrapper>
    </>
  );
}

const HGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ first }) => first || ""} repeat(
      ${({ cols }) => cols},
      1fr
    );
  height: 100%;

  p {
    border: 1px solid red;
  }
`;

const DayVWrapper = styled.span`
  height: 100%;
  border: 1px solid green;
  position: relative;
  background: ${({ isToday }) => (isToday ? "#EED2CC" : "")};
`;

const VGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);

  :first-child {
    margin-top: ${HOUR_MARGIN_TOP}px;
  }
`;

const Hour = styled.span`
  height: ${HOUR_BOX_HEIGHT}px;
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  width: calc(100% - 30px);
  border: 2px solid;
  margin: 15px;
  position: relative;
`;

const HourLine = styled.span`
  position: absolute;
  border-bottom: 1px solid red;
  top: ${({ fromTop }) => fromTop}px;
  width: 100%;
`;

const Event = styled.span`
  background: #5a6650;
  padding: 10px 3px;
  color: white;
  font-size: 18px;
  position: absolute;
  margin: 5px;
  top: ${({ fromTop }) => fromTop}px;
  height: ${({ height }) => height * 30}px;
  width: calc(100% - 10px);
  border-radius: 5px;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  align-items: center;

  button {
    align-items: center;
    display: flex;
    font-size: 19px;
    align-items: center;
    padding: 5px 10px;
  }
`;



