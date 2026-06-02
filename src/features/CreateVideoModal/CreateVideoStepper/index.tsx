import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Steps } from 'antd';
import { useCreateVideoModal } from '@/shared/store/createVideoModal';
import { StepInfo } from './StepInfo';
import styles from './styles.module.scss'
import clsx from 'clsx';
import { Svg, Text } from '@/shared/ui';
import { title } from 'process';
import { StepFragments } from './StepFragments';


interface ICreateVideoStepper {
}

export type TSteps = 0 | 1 | 2

enum EStepStatuses {
    COMPLETED = 'COMPLETED',
    CURRENT = 'CURRENT',
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
        setActiveStep(current as TSteps);
    };


    const steps = [
        {
            icon: <MyStep stepName={'Информация'} status={activeStep === 0 ? EStepStatuses.CURRENT : activeStep > 0 ? EStepStatuses.COMPLETED : EStepStatuses.DISABLED}/>,
        },
        {
            icon: <MyStep stepName={'Фрагменты'} status={activeStep === 1 ? EStepStatuses.CURRENT : activeStep > 1 ? EStepStatuses.COMPLETED : EStepStatuses.DISABLED}/>,
        },
        {
            icon: <MyStep stepName={'Доступ'} status={activeStep === 2 ? EStepStatuses.CURRENT : activeStep > 2 ? EStepStatuses.COMPLETED : EStepStatuses.DISABLED}/>,
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
            <div className={clsx( styles.divider, styles.hidden)} id="stepperDivider"></div>

            <div className={styles.stepContent} id="stepContent">
                {
                    activeStep === 0 && (
                        <StepInfo setActiveStep={setActiveStep}/>
                    )
                }
                {
                    activeStep === 1 && (
                        <StepFragments setActiveStep={setActiveStep}/>
                    )
                }
            </div>
        </>
    )
}