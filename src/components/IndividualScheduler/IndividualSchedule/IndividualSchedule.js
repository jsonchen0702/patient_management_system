import styles from "./IndividualSchedule.module.scss";
import { Link } from "react-router-dom";

const colorPallete = [
  "FFE194",
  "6D97C9",
  "8CC3A0",
  "E9DA90",
  "F29D72",
  "D17484",
];

const backgroundClrValue =
  colorPallete[Math.floor(Math.random() * colorPallete.length)];

const IndividualSchedule = ({
  patients,
  workingDays,
  workingHours,
  physiotherapist,
}) => {
  const indexValue = workingDays.length * workingHours.length;

  const createScheduleBackground = () => {
    let scheduleFields = [];

    for (let i = 0; i < indexValue; i++) {
      scheduleFields.push(<div key={i}></div>);
    }
    return scheduleFields;
  };

  const gridMoreDays = {
    gridTemplateColumns: `repeat(${workingDays.length}, ${
      100 / workingDays.length
    }% [col-start])`,
    gridTemplateRows: `repeat(${workingHours.length}, 12rem [row-start])`,
  };
  let gridLessDays = {
    gridTemplateColumns: `repeat(${workingDays.length}, 20% [col-start])`,
  };

  return (
    <section className={styles.IndividualScheduleWrapper}>
      <header className={styles.Header}>{workingDays}</header>
      <main className={styles.Main}>
        <section className={styles.Time}>
          <ul>{workingHours}</ul>
        </section>
        <section
          className={styles.IndividualSchedule}
          style={
            workingDays.length > 5 ? gridMoreDays : gridLessDays
            //This fixes issues with layout if there are less then 6 working days
          }
        >
          {createScheduleBackground()}
          {patients.length > 0
            ? patients.map((patient, i) => {
                const positionValues = {
                  topPositionValue:
                    patient.position.topHours * 12 +
                    patient.position.topMinutes * 0.2,
                  leftPosValueMoreDays:
                    (patient.position.left * 100) / workingDays.length + 0.5,
                  leftPosValueLessDays: patient.position.left * 20 + 0.5,
                  heightValue: patient.position.height * 0.2 - 0.1,
                  widthValue: 100 / workingDays.length - 1,
                };
                const {
                  topPositionValue,
                  leftPosValueMoreDays,
                  heightValue,
                  widthValue,
                  leftPosValueLessDays,
                } = positionValues;

                return (
                  <Link
                    to={`/patients/individual-patients/${physiotherapist.toLowerCase()}/patient-details/${
                      patient.id
                    }`}
                    key={i}
                    style={
                      workingDays.length > 5
                        ? {
                            top: `${topPositionValue}rem`,
                            left: `${leftPosValueMoreDays}%`,
                            width: `${widthValue}%`,
                            height: `${heightValue}rem`,
                            backgroundColor: `#${backgroundClrValue}`,
                          }
                        : {
                            top: `${topPositionValue}rem`,
                            left: `${leftPosValueLessDays}%`,
                            height: `${heightValue}rem`,
                            backgroundColor: `#${backgroundClrValue}`,
                          }
                      //This fixes issues with layout if there are less then 6 working days
                    }
                  >
                    {`${patient.firstName + " " + patient.lastName}`}
                  </Link>
                );
              })
            : null}
        </section>
      </main>
    </section>
  );
};

export default IndividualSchedule;