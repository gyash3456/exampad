import React, { useState, useEffect } from "react";
import SimpleChatBot from "react-simple-chatbot";
import axios from "axios";
function Comp() {
  return <div> This is an example component </div>;
}
const ChatBot = () => {
  const stepsarr = [
    {
      id: "1",
      message: "What is your name?",
      trigger: "name",
    },
    {
      id: "name",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Hi {previousValue}! What is your gender?",
      trigger: "gender",
    },
    {
      id: "gender",
      options: [
        { value: "male", label: "Male", trigger: "5" },
        { value: "female", label: "Female", trigger: "5" },
      ],
    },
    {
      id: "5",
      message: "How old are you?",
      end: true,
    },
  ];

  // stepsarr.forEach(componentFilter);

  // function componentFilter(obj, index, array) {
  //   if (obj.options.length == 0) {
  //     delete obj.options;
  //   }
  //   if (obj.component !== undefined) {
  //     obj["component"] = <Comp />;
  //   }
  // }

  const [steps, setSteps] = useState();
  const [isLoad, setIsLoad] = useState(false);

  // useEffect(() => {
  //   axios.get(`http://localhost:8000/chatbot/getAll`).then((res) => {
  //     const data = res.data;
  //     console.log(data);
  //     data.forEach(componentFilter);

  //     setSteps(data);
  //     setIsLoad(true);
  //   });
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <SimpleChatBot steps={stepsarr} />
        {/* {isLoad && <SimpleChatBot steps={steps} />} */}
      </header>
    </div>
  );
};

export default ChatBot;
