import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Steps } from 'antd';
import clsx from 'clsx';
import { Svg, Text } from '@/shared/ui';
import { StepInfo } from './StepInfo';
import { StepFragments } from './StepFragments';
import { StepAccess } from './StepAccess';
import styles from './styles.module.scss'


interface ICreateVideoStepper {
}

export type TSteps = 0 | 1 | 2

enum EStepStatuses {
    COMPLETED = 'COMPLETED',
    CURRENT = 'CURRENT',
    OPENED = 'OPENED',
    DISABLED = 'DISABLED'
} 

const MyStep = ({stepName, status}: {stepName: string, status: keyof typeof EStepStatuses}) => {
    return (
        <div className={styles.customStep}>
            <Text weight={600} className={clsx({[styles.stepNameDisabled]: status === EStepStatuses.DISABLED})}>{stepName}</Text>
            {status === EStepStatuses.COMPLETED && (
                <Svg name='check'/>
            )}

            {status === EStepStatuses.CURRENT && (
                <div className={styles.current}>
                    <div></div>
                </div>
            )}

            {status === EStepStatuses.OPENED && (
                <div className={styles.opened}>
                    <div></div>
                </div>
            )}

            {status === EStepStatuses.DISABLED && (
                <div className={styles.disabled}>
                    <div></div>
                </div>
            )}
        </div>
    )
}


export const CreateVideoStepper: FC<ICreateVideoStepper> = ({
}) => {
    const [activeStep, setActiveStep] = useState<TSteps>(0)
    const [lastCompletedStep, setLastCompletedStep] = useState<TSteps | null>(null)

    useEffect(() => {
        const stepContent = document.getElementById('stepContent')
        const stepperDivider = document.getElementById('stepperDivider')

        const handleScroll = () => {
            if(stepContent?.scrollTop && stepContent?.scrollTop > 0) {
                stepperDivider?.classList.remove(styles.hidden)
                stepperDivider?.classList.add(styles.visible)
            } else {
                stepperDivider?.classList.add(styles.hidden)
                stepperDivider?.classList.remove(styles.visible)
            }
        }

        stepContent?.addEventListener('scroll', handleScroll)
        
        return () => {
            stepContent?.removeEventListener('scroll', handleScroll)
        }
    }, [])


    const handleStepChange = (current: number) => {
        if (typeof lastCompletedStep === 'number' && (current <= lastCompletedStep + 1)) {
            setActiveStep(current as TSteps);
        }
    };

    const steps = [
        {
            icon: <MyStep stepName={'Информация'} status={activeStep === 0 ? EStepStatuses.CURRENT : (typeof lastCompletedStep === 'number' && lastCompletedStep + 1 === 0) ? EStepStatuses.OPENED : lastCompletedStep >= 0 ? EStepStatuses.COMPLETED : EStepStatuses.DISABLED}/>,
        },
        {
            icon: <MyStep stepName={'Фрагменты'} status={activeStep === 1 ? EStepStatuses.CURRENT : (typeof lastCompletedStep === 'number' && lastCompletedStep + 1 === 1) ? EStepStatuses.OPENED : lastCompletedStep >= 1 ? EStepStatuses.COMPLETED : EStepStatuses.DISABLED}/>,
        },
        {
            icon: <MyStep stepName={'Доступ'} status={activeStep === 2 ? EStepStatuses.CURRENT : (typeof lastCompletedStep === 'number' && lastCompletedStep + 1 === 2) ? EStepStatuses.OPENED : lastCompletedStep >= 2 ? EStepStatuses.COMPLETED : EStepStatuses.DISABLED}/>,
        },
    ];
    
    return (
        <>
            <Steps 
                current={activeStep} 
                onChange={handleStepChange}
                className={styles.stepper}
                items={steps.map((step, index) => ({
                    icon: step.icon,
                }))}
            />
            <div className={clsx(styles.divider, styles.hidden)} id="stepperDivider"></div>

            <div className={styles.stepContent} id="stepContent">
                {
                    activeStep === 0 && (
                        <StepInfo setActiveStep={setActiveStep} setLastCompletedStep={setLastCompletedStep} lastCompletedStep={lastCompletedStep}/>
                    )
                }
                {
                    activeStep === 1 && (
                        <StepFragments setActiveStep={setActiveStep} setLastCompletedStep={setLastCompletedStep} lastCompletedStep={lastCompletedStep}/>
                    )
                }
                {
                    activeStep === 2 && (
                        <StepAccess setActiveStep={setActiveStep} setLastCompletedStep={setLastCompletedStep} lastCompletedStep={lastCompletedStep}/>
                    )
                }
            </div>
        </>
    )
}