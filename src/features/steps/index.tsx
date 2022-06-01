import React, { useMemo, useState } from "react";
import "./styles.scss"

const Steps: React.FC<any> = (props) => {
    const { stepsDefault = [], onSelect = () => {}, onStepActive = () => {} } = props
    const [steps, setSteps] = useState<any[]>(stepsDefault || [])

    const activeIndex = useMemo(() => {
        let actIndex = 0
        steps.map((step, index) => {
            if (step.active) {
                actIndex = index
            }
            return step
        })

        onStepActive(stepsDefault[actIndex])

        return actIndex
    }, [steps, onStepActive, stepsDefault])


    const handleSelect = (id: number | string) => {
        setSteps(
            steps.map((st) => {
                if (st.id === id) {
                    return {
                        ...st,
                        active: !st.active
                    }
                }
                return st
            })
        )
        onSelect(id)
    }


    return (
        <div className="step">
            {
                steps.map((step, index) => (
                    <div
                        key={step.id}
                        onClick={() => handleSelect(step.id)}
                        style={{ width: `${steps.length - 1 === index ? "80px" : "100%"}` }}
                        className="step-item-container"
                    >
                        <div
                            className={`step-item ${index === activeIndex ? "step-item--active" : index < activeIndex && "step-item--completed"}`}
                        >{step.title}</div>
                        <div className="step-item-sub">{step.subtitle}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Steps;
