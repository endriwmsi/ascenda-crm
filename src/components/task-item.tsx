"use client";

import { Task } from "@/app/types/constants";
import Modal from "./ui/modal";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { deleteTask } from "@/actions/tasks/delete-task";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { updateTaskStatus } from "@/actions/tasks/update-task-status";
import { cn } from "@/lib/utils";

const statusMap = {
  PENDING: "Pendente",
  IN_PROGRESS: "Em Progresso",
  COMPLETED: "Concluída",
};

const priorityNap = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  URGENT: "Urgente",
};

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState(task.status);

  const handleStatusChange = async () => {
    try {
      const updatedStatus = await updateTaskStatus(task.id);
      setTaskStatus(updatedStatus);
      toast({
        description: `Status atualizado para: ${statusMap[updatedStatus]}`,
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Erro ao atualizar o status da tarefa.",
      });
    }
  };

  return (
    <>
      <Card key={task.id}>
        <CardHeader className="p-4">
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="-mt-6 flex items-center justify-between p-4">
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "rounded-lg px-2 py-1 text-xs",
                taskStatus === "PENDING" && "bg-yellow-400 text-white",
                taskStatus === "IN_PROGRESS" && "bg-orange-400 text-white",
                taskStatus === "COMPLETED" && "bg-green-400 text-white",
              )}
            >
              {statusMap[taskStatus]}
            </span>

            <span
              className={cn(
                "rounded-lg px-2 py-1 text-xs",
                task.priority === "LOW" && "bg-yellow-400 text-white",
                task.priority === "MEDIUM" && "bg-orange-400 text-white",
                task.priority === "HIGH" && "bg-green-400 text-white",
                task.priority === "URGENT" && "bg-green-400 text-white",
              )}
            >
              {priorityNap[task.priority]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  {(taskStatus === "PENDING" ||
                    taskStatus === "IN_PROGRESS") && (
                    <Button onClick={handleStatusChange}>
                      {taskStatus === "PENDING" ? "Iniciar" : "Concluir"}
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent side="top" align="center" alignOffset={2}>
                  Atualizar status
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>

        {/* <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="text-lg"></span>
          <Badge>{priorityNap[task.priority]}</Badge>
        </div>

        <div className="mt-2 flex flex-col items-end gap-4 sm:mt-0">
          <Badge>{statusMap[task.status]}</Badge>

          {task.dueDate && (
            <span className="text-xs text-muted-foreground">
              Vencimento: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div> */}
      </Card>

      <Modal
        title="Deletar tarefa"
        description="Você tem certeza que deseja deletar esta tarefa?"
        isOpen={isDeleteTaskModalOpen}
        setIsOpen={setIsDeleteTaskModalOpen}
      >
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={() => setIsDeleteTaskModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteTask(task.id);
              toast({
                description: "Tarefa deletada com sucesso!",
              });
              setIsDeleteTaskModalOpen(false);
            }}
          >
            Deletar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TaskItem;
