"use client";

import { Task } from "@/app/types/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { useState } from "react";
import CreateTaskForm from "./form/create-task-form";
import TaskItem from "@/components/task-item";

type TasksProps = {
  data: Task[];
  className?: string;
};

const Tasks = ({ data }: TasksProps) => {
  const [isNewtaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const filteredTasks = data.filter(
    (task) => task.status === "PENDING" || task.status === "IN_PROGRESS",
  );

  return (
    <>
      <Card className="h-full max-h-[500px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <CardTitle>Tarefas</CardTitle>
              <CardDescription>Lista de atividades</CardDescription>
            </div>

            <Button onClick={() => setIsNewTaskModalOpen(true)}>
              Nova Tarefa
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <div className="mt-24">
              <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                <p className="text-lg font-medium">Nenhuma tarefa</p>
                <p>Adicione uma nova tarefa</p>
              </div>
            </div>
          ) : (
            <div className="h-full max-h-[380px] w-full space-y-2 overflow-y-scroll">
              {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
      </Card>

      <Modal
        title="Adicionar nova tarefa"
        description="Preencha os campos abaixo para adicionar uma nova tarefa."
        isOpen={isNewtaskModalOpen}
        setIsOpen={setIsNewTaskModalOpen}
      >
        <CreateTaskForm onSave={() => setIsNewTaskModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Tasks;
