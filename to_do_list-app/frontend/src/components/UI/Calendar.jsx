import React, {useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {ChevronDownIcon} from "@heroicons/react/24/outline"

function Calendar({onDateRangeChange, tasks}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    start: new Date(), // Default to today
    end: new Date(),
  });

  // Toggle expand/collapse state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle date click (for single day selection in expanded state)
  const handleDateClick = (info) => {
    const selectedDate = new Date(info.dateStr);
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
    setSelectedRange({start: startOfDay, end: endOfDay});
    onDateRangeChange(startOfDay, endOfDay);
  };

  // Handle predefined filter: Today
  const handleTodayFilter = () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    setSelectedRange({start: startOfDay, end: endOfDay});
    onDateRangeChange(startOfDay, endOfDay);
  };

  // Handle predefined filter: This Week
  const handleThisWeekFilter = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of week (Saturday)
    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setHours(23, 59, 59, 999);
    setSelectedRange({start: startOfWeek, end: endOfWeek});
    onDateRangeChange(startOfWeek, endOfWeek);
  };

  // Handle predefined filter: Next Week
  const handleNextWeekFilter = () => {
    const today = new Date();
    const startOfNextWeek = new Date(today);
    startOfNextWeek.setDate(today.getDate() - today.getDay() + 7); // Start of next week (Sunday)
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // End of next week (Saturday)
    startOfNextWeek.setHours(0, 0, 0, 0);
    endOfNextWeek.setHours(23, 59, 59, 999);
    setSelectedRange({start: startOfNextWeek, end: endOfNextWeek});
    onDateRangeChange(startOfNextWeek, endOfNextWeek);
  };

  // Map tasks to FullCalendar events
  const events = tasks.map((task) => ({
    title: task.title,
    date: task.due_date, // FullCalendar accepts YYYY-MM-DD or Date objects
  }));

  return (
      <div className="p-4">
        {/* Predefined Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
              onClick={handleTodayFilter}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Today
          </button>
          <button
              onClick={handleThisWeekFilter}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            This Week
          </button>
          <button
              onClick={handleNextWeekFilter}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next Week
          </button>
        </div>

        {/* Expand/Collapse Button and Calendar */}
        <div className="flex items-center mb-2">
          <button onClick={toggleExpand} className="mr-2">
            <ChevronDownIcon
                className={`w-8 h-8 transition-transform duration-500 cursor-pointer ${isExpanded ? "rotate-180" : ""}`}/>
          </button>
          {!isExpanded && (
              <span>
            {selectedRange.start.toLocaleDateString()} - {selectedRange.end.toLocaleDateString()}
          </span>
          )}
        </div>

        <div
            className={`transition-all duration-600  ${isExpanded ? "opacity-100 visible" : "opacity-0 invisible max-h-20"}`}>
          <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={handleDateClick}
              selectable={true}
              height="auto"
              events={events}
          />
        </div>
      </div>
  );
}

export default Calendar;