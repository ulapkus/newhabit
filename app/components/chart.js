import React, { useState, useEffect } from "react";
import Questions from "./questions";

export const Context = React.createContext();

export default function Chart() {
  const [random, setRandom] = useState([]);
  const [renderCount, setRenderCount] = useState(["", "", "", "", "", "", ""]);
  const colors = [
    "Choose color",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
  ];
  const inputValues = [];
  const selectedColors = [];
  const [addInputSubmit, setAddInputSubmit] = useState(false);
  const [addInputSubmitTwo, setAddInputSubmitTwo] = useState(false);

  const handleColorSelection = (event) => {
    const selectedColor = event.target.value;
    const cellrows = document.getElementsByClassName("random-row");

    for (let i = 0; i < cellrows.length; i++) {
      const cellsInRow = cellrows[i].querySelectorAll(".cell");

      cellsInRow.forEach((cell) => {
        cell.addEventListener("click", () => {
          switch (selectedColor) {
            case "red":
              cell.style.backgroundColor = "red";
              break;
            case "orange":
              cell.style.backgroundColor = "orange";
              break;
            case "yellow":
              cell.style.backgroundColor = "yellow";
              break;
            case "green":
              cell.style.backgroundColor = "green";
              break;
            case "blue":
              cell.style.backgroundColor = "blue";
              break;
            case "purple":
              cell.style.backgroundColor = "purple";
              break;
            case "pink":
              cell.style.backgroundColor = "pink";
              break;
          }
        });
      });
    }
    selectedColors.push(selectedColor);
    console.log(selectedColors);

    const clickedCell = event.target;
    const rowIndex = clickedCell.parentElement.rowIndex;
    const cellIndex = clickedCell.cellIndex;

    for (let k = 0; k < 3; k++) {
      for (let j = 0; j < cellrows.length; j++) {
        if (rowIndex === k && cellIndex === j) {
          document.getElementById("mytable").rows[k].cells[
            j
          ].style.backgroundColor = selectedColors[k];
        }
      }
    }
  };

  const createNewRow = () => {
    const table = document.getElementById("mytable");
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    cell1.className = "cell";
    const cell2 = newRow.insertCell(1);
    cell2.className = "cell";
    const cell3 = newRow.insertCell(2);
    cell3.className = "cell";
    const cell4 = newRow.insertCell(3);
    cell4.className = "cell";
    const cell5 = newRow.insertCell(4);
    cell5.className = "cell";
    const cell6 = newRow.insertCell(5);
    cell6.className = "cell";
    const cell7 = newRow.insertCell(6);
    cell7.className = "cell";

    const habitInputBox = document.createElement("input");
    habitInputBox.setAttribute("type", "text");
    habitInputBox.name = "newbox";
    habitInputBox.placeholder = "Insert habit";
    habitInputBox.id = "blahhh";
    habitInputBox.classList.add("habit-input-box");

    document.getElementById("newHabitId").appendChild(habitInputBox);

    setAddInputSubmit(true);
  };

  useEffect(() => {
    if (addInputSubmit && !addInputSubmitTwo) {
      const habitsubmit = document.createElement("button");
      habitsubmit.textContent = "Submit";
      habitsubmit.id = "input-box-submit";
      habitsubmit.classList.add("habit-submit");

      document.getElementById("child").appendChild(habitsubmit);
      setAddInputSubmitTwo(true);

      habitsubmit.addEventListener("click", function () {
        const inputElements = document.querySelectorAll("input");
        for (let i = 2; i < inputElements.length; i++) {
          inputValues.push(inputElements[i].value);
          console.log(inputValues);

          while (document.getElementById("newHabitId").firstChild) {
            document
              .getElementById("newHabitId")
              .removeChild(document.getElementById("newHabitId").firstChild);
          }

          for (let i = 0; i < inputValues.length; i++) {
            const finalHabitBox = document.createElement("p");
            finalHabitBox.classList.add("final-habit-box");

            finalHabitBox.textContent = inputValues[i];
            document.getElementById("newHabitId").appendChild(finalHabitBox);
          }
        }
      });
    }
  }, [addInputSubmit, addInputSubmitTwo, inputValues]);

  function removeHabits() {
    for (let i = 0; i < random.length; i++) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkboxes";
      document
        .getElementById("checkbox-parent")
        .appendChild(checkbox, random[i]);
    }

    const parent = document.getElementById("checkboxes-plus-submit");
    const newChild = document.createElement("button");
    newChild.onclick = checkIfSubmit;
    newChild.textContent = "Submit";

    const oldChild = document.getElementById("child");
    parent.replaceChild(newChild, oldChild);
  }

  const chooseColor = () => {
    for (let i = 0; i < random.length; i++) {
      const dropdown = document.createElement("select");
      dropdown.id = "select";
      dropdown.className = "select";

      for (let j = 0; j <= colors.length; j++) {
        const option = document.createElement("option");
        option.className = "colorz";
        option.text = colors[j];
        option.value = colors[j];
        option.id = "text";

        dropdown.appendChild(option);
      }
      document.getElementById("checkbox-parent").appendChild(dropdown);
    }
    for (let l = 0; l < document.getElementsByTagName("select").length; l++) {
      document
        .getElementsByTagName("select")
        [l].addEventListener("change", handleColorSelection);
    }

    const colorSubmit = document.createElement("button");
    colorSubmit.textContent = "Submit";
    colorSubmit.id = "color-submit";
    colorSubmit.classList.add("color-submit");
    colorSubmit.addEventListener("click", function () {
      colorSubmitClicked();
    });
    document.getElementById("child").appendChild(colorSubmit);
  };

  const colorSubmitClicked = () => {
    document
      .getElementById("child")
      .removeChild(document.getElementById("color-submit"));
    while (document.getElementById("checkbox-parent").firstChild) {
      document
        .getElementById("checkbox-parent")
        .removeChild(document.getElementById("checkbox-parent").firstChild);
    }
  };

  const checkIfSubmit = () => {
    const boxes = document.getElementsByClassName("checkboxes");

    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        random.splice(boxes[i], 1);
        console.log(random[i]);

        const tablee = document.getElementById("mytable");
        tablee.removeChild(document.getElementsByClassName("random-row")[i]);

        const habitBox = document.getElementById("habits-input-boxes");
        habitBox.removeChild(
          document.getElementsByClassName("imported-habits")[i]
        );
      }
    }
  };

  return (
    <div className="background">
      <h1>My Habit Tracker</h1>
      <div className="mainquestions">
        <div className="checkboxes-plus-chart">
          <div id="checkboxes-plus-submit">
            <div id="checkbox-parent"></div>
            <div id="child"></div>
          </div>
          <section className="border">
            <Context.Provider value={[random, setRandom]}>
              <Questions />
            </Context.Provider>
            <section className="habits">
              <h4>Habit</h4>
              <div id="habits-input-boxes">
                {random.map((item, index) => (
                  <p key={index} className="imported-habits">
                    {item}
                  </p>
                ))}
              </div>
              <div id="newHabitId"></div>
            </section>

            <section>
              <table>
                <tbody>
                  <tr>
                    <td className="dayz" id="one">
                      Day 1
                    </td>
                    <td className="dayz">Day 2</td>
                    <td className="dayz">Day 3</td>
                    <td className="dayz">Day 4</td>
                    <td className="dayz">Day 5</td>
                    <td className="dayz">Day 6</td>
                    <td className="dayz">Day 7</td>
                  </tr>
                </tbody>
                <tbody id="mytable">
                  {random.map((item, index) => (
                    <tr key={index} className="random-row">
                      {renderCount.map((item, dindex) => (
                        <td key={dindex} className="first-habit-cell cell">
                          {item}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
        </div>
        <div className="chart-buttons">
          <button onClick={createNewRow} className="chart-buttons-individual">
            + Add Habit
          </button>
          <button className="chart-buttons-individual" onClick={removeHabits}>
            - Remove habit
          </button>
          <button className="chart-buttons-individual" onClick={chooseColor}>
            Color
          </button>
          {/* onClick={() => setColorSubmit(true)} */}
          {/* <button className="chart-buttons-individual" onClick={save}>Save</button> */}
          <button className="chart-buttons-individual">Other</button>
        </div>
      </div>
    </div>
  );
}

// const colors = ["Choose color", "red", "orange", "yellow", "green", "blue", "purple", "pink"];

// case "red":
//   event.target.style.backgroundColor = "red";
//   break;
// case "orange":
//   event.target.style.backgroundColor = "orange";
//   break;
// case "yellow":
//   event.target.style.backgroundColor = "yellow";
//   break;
// case "green":
//   event.target.style.backgroundColor = "green";
//   break;
// case "blue":
//   event.target.style.backgroundColor = "blue";
//   break;
// case "purple":
//   event.target.style.backgroundColor = "purple";
//   break;
// case "pink":
//   event.target.style.backgroundColor = "pink";
//   break;
