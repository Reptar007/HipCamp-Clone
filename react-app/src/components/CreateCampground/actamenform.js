

function ActivityAmenityForm({next, back, state, setState}) {


    let actArr = state.activities
    const setAct = (e)  => {
    setState({
          ...state,
          activities: [
            ...state["activities"],
            +e.target.getAttribute("data-value")
          ],
        });
        if (actArr.indexOf(+e.target.getAttribute("data-value")) !== -1) {
          actArr.splice(
            state.activities.indexOf(+e.target.getAttribute("data-value")),
            1
          );
          setState({ ...state, activities: actArr });
        }
      }

      
    let amnArr = state.amenities;

    const setAmen = (e) => {
        setState({
          ...state,
          amenities: [
            ...state["amenities"],
            +e.target.getAttribute("data-value")
          ],
        });

        if (amnArr.indexOf(+e.target.getAttribute("data-value")) !== -1) {
          amnArr.splice(
            state.amenities.indexOf(+e.target.getAttribute("data-value")),
            1
          );
          setState({ ...state, amenities: amnArr });
        }  
    };

    console.log(amnArr)


    return (
      <div>
        <h1>Activity</h1>
        <div
          className={
            actArr.includes(1) ? "testingblock checked" : "testingblock"
          }
          data-value={1}
          onClick={(e) => setAct(e)}
        >
          Hiking
        </div>
        <div
          className={
            actArr.includes(2) ? "testingblock checked" : "testingblock"
          }
          data-value={2}
          onClick={(e) => setAct(e)}
        >
          paddling
        </div>
        <div
          className={
            actArr.includes(3) ? "testingblock checked" : "testingblock"
          }
          data-value={3}
          onClick={(e) => setAct(e)}
        >
          biking
        </div>
        <div
          className={
            actArr.includes(4) ? "testingblock checked" : "testingblock"
          }
          data-value={4}
          onClick={(e) => setAct(e)}
        >
          swimming
        </div>
        <div
          className={
            actArr.includes(5) ? "testingblock checked" : "testingblock"
          }
          data-value={5}
          onClick={(e) => setAct(e)}
        >
          fishing
        </div>
        <div
          className={
            actArr.includes(6) ? "testingblock checked" : "testingblock"
          }
          data-value={6}
          onClick={(e) => setAct(e)}
        >
          wildlife watching
        </div>
        <div
          className={
            actArr.includes(7) ? "testingblock checked" : "testingblock"
          }
          data-value={7}
          onClick={(e) => setAct(e)}
        >
          climbing
        </div>
        <div
          className={
            actArr.includes(8) ? "testingblock checked" : "testingblock"
          }
          data-value={8}
          onClick={(e) => setAct(e)}
        >
          horseback
        </div>
        <h1>Amenities</h1>
        <div
          className={
            amnArr.includes(3) ? "testingblock checked" : "testingblock"
          }
          data-value={3}
          onClick={(e) => setAmen(e)}
        >
          wifi
        </div>
        <div
          className={
            amnArr.includes(4) ? "testingblock checked" : "testingblock"
          }
          data-value={4}
          onClick={(e) => setAmen(e)}
        >
          water
        </div>
        <div
          className={
            amnArr.includes(6) ? "testingblock checked" : "testingblock"
          }
          data-value={6}
          onClick={(e) => setAmen(e)}
        >
          Bins
        </div>
        <div
          className={
            amnArr.includes(7) ? "testingblock checked" : "testingblock"
          }
          data-value={7}
          onClick={(e) => setAmen(e)}
        >
          showers
        </div>
        <div
          className={
            amnArr.includes(8) ? "testingblock checked" : "testingblock"
          }
          data-value={8}
          onClick={(e) => setAmen(e)}
        >
          toliets
        </div>
        <div
          className={
            amnArr.includes(9) ? "testingblock checked" : "testingblock"
          }
          data-value={9}
          onClick={(e) => setAmen(e)}
        >
          kitchen
        </div>
        <div
          className={
            amnArr.includes(11) ? "testingblock checked" : "testingblock"
          }
          data-value={11}
          onClick={(e) => setAmen(e)}
        >
          parking
        </div>
        <div
          className={
            amnArr.includes(12) ? "testingblock checked" : "testingblock"
          }
          data-value={12}
          onClick={(e) => setAmen(e)}
        >
          campfire
        </div>
        <div
          className={
            amnArr.includes(13) ? "testingblock checked" : "testingblock"
          }
          data-value={13}
          onClick={(e) => setAmen(e)}
        >
          pets
        </div>
        <button onClick={back}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    );
}

export default ActivityAmenityForm