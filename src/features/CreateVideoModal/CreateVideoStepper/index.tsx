import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Steps } from 'antd';
import { useCreateVideoModal } from '@/shared/store/createVideoModal';
import { StepInfo } from './StepInfo';


interface ICreateVideoStepper {
}

type TSteps = 0 | 1 | 2 | 3 

const MyStep = ({setActiveStep, step}: {setActiveStep: any, step: TSteps}) => {
    return (
        <div onClick={setActiveStep(step)}>
            {step}
        </div>
    )
}


export const CreateVideoStepper: FC<ICreateVideoStepper> = ({
}) => {
    const [activeStep, setActiveStep] = useState<TSteps>(0)

    const steps = [
        {
            title: 'Загрузка',
            description: 'Информация',
            icon: 1,
        },
        {
            title: 'Детали',
            description: 'Дополнения',
            icon: 2,
        },
        {
            title: 'Настройки',
            description: 'Предварительная проверка',
            icon: 3,
        },
        {
            title: 'Публикация',
            description: 'Доступ',
            icon: 4,
        },
    ];

    const handleStepChange = (current: number) => {
        setActiveStep(current as TSteps);
    };
    
    return (
        <>
            <Steps 
                current={activeStep} 
                onChange={handleStepChange}
                items={steps.map((step, index) => ({
                    title: step.title,
                    description: step.description,
                    icon: step.icon,
                    status: index < activeStep ? 'finish' : index === activeStep ? 'process' : 'wait'
                }))}
            />

            {
                activeStep === 0 && (
                    <StepInfo/>
                )
            }
        </>
    )
}