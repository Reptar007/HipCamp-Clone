function Activities({ camp }) {

    const activities = camp?.Activites

    const activitylogo =(id) => {
        if(id === 1) return <i class="fa-thin fa-person-hiking"></i>;
        if(id === 2) return <i class="fa-thin fa-sailboat"></i>;
        if(id === 3) return <i class="fa-thin fa-person-biking"></i>;
        if(id === 4) return <i class="fa-thin fa-person-swimming"></i>;
        if(id === 5) return <i class="fa-thin fa-fishing-rod"></i>;
        if(id === 6) return <i class="fa-thin fa-feather-pointed"></i>;
        if(id === 7) return <i class="fa-thin fa-mountain"></i>;
        if(id === 8) return <i class="fa-thin fa-horse-saddle"></i>;
    }

    return (
      <div className="activities_container">
        <h3>Activities</h3>
        <h4>Offered on the Host's property or nearby.</h4>
        <div className="activity_boxes">
            {activities?.map(activity => (
                <div key={activity.id} className='activity_box'>
                    <div className="act_img">
                        {activitylogo(activity.id)}
                    </div>
                    <p>{activity.name.toUpperCase()}</p>
                </div>
            ))}
        </div>
      </div>
    );
}

export default Activities