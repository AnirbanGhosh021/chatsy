import React from "react";
import { MessageCircle } from "lucide-react";

function NoChatPlacehodlder({ name }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-300">
      
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-800 mb-6">
        <MessageCircle size={30} className="text-cyan-400" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">
        Start your conversation with {name}
      </h2>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 max-w-md">
        This is the beginning of your conversation. Send a message to start chatting!
      </p>

      {/* Quick buttons */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm">
          👋 Say Hello
        </button>

        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm">
          🤝 How are you?
        </button>

        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm">
          📅 Meet up soon?
        </button>
      </div>
    </div>
  );
}

export default NoChatPlacehodlder;