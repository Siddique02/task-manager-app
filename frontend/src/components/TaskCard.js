export default function TaskCard({ task, onEdit, onDelete }) {
  const isCompleted = task.status === 'completed';

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-bold text-gray-900 leading-tight ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
            isCompleted ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {task.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      </div>

      <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-400">
          Due: {task.dueDate}
        </span>
        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(task)}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-sm font-bold text-red-400 hover:text-red-600 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}