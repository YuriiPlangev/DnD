import "./App.css";
import AbilityScores from "./Components/AbilityScores";
import Portrait from "./Components/Portrait";
import Information from "./Components/Information";
import Inventory from "./Components/Inventory";
import Stats from "./Components/Stats";
import Notes from "./Components/Notes";
import Equipment from "./Components/Equipment";

function App() {
  return (
    <>
      <div className="text-center">
        <h1>D&D Character Creator</h1>
        <p>Create your legendary adventurer</p>
      </div>
      <main className="grid grid-cols-3 gap-10 mt-10">
        <div className="flex flex-col gap-10">
          <Portrait />
          <Information />
        </div>

        <div className="flex flex-col gap-10">
          <AbilityScores />
          <Stats />
          <Notes />
        </div>
        <div className="flex flex-col gap-10">
          <Equipment />
          <Inventory />
        </div>
      </main>
    </>
  );
}

export default App;
