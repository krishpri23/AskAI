import SubmitQs from "../../components/SubmitQs";

// shows single chat details
function ChatPage() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-900  ">
      <div className="relative w-3/4 flex-1 flex flex-col space-y-5 overflow-y-auto px-10 py-5">
        <div className="user">User message</div>
        <div className="response">Response message</div>
        <div className="user">User message</div>
        <div className="response">Response message</div>
        <div className="user">User message</div>
        <div className="response">Response message</div>
        <div className="user">User message</div>
        <div className="response">Response message</div>
        <div className="user">User message</div>
        <div className="response">Response message</div>
        <div className="user">User message</div>
        <div className="response">Response message</div>
        <div className="user">User message</div>
        <div className="response">Response message</div>
        <div className="user">User message</div>
        <div className="response">Response message</div>
      </div>

      {/* To Prevent rendering the form component whenever a new message is received, create separate component */}
      <div className="w-3/4  mx-auto">
        <SubmitQs />
      </div>
    </section>
  );
}

export default ChatPage;
