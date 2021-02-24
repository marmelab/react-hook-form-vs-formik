import "./App.css";
import React from "react";
import * as MUI from "@material-ui/core";
import * as RHF from "react-hook-form";
import * as Zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import type { PersonType } from "./person";
import { Person, defaultPerson } from "./person";

export const ReactHookForm = () => {
    const renders = React.useRef(0);
    React.useEffect(() => {
        renders.current += 1;
    });
    const form = RHF.useForm<PersonType>({
        defaultValues: defaultPerson,
        resolver: zodResolver(Person),
        shouldFocusError: true,
    });

    const fields = Object.keys(Person.shape) as Array<keyof PersonType>;
    const onSubmit = (data: PersonType) => {
        alert(JSON.stringify(data));
    };
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} style={{ flex: 1 }}>
            <MUI.Box display="flex" flexDirection="column">
                <MUI.Typography color="secondary" variant="h2">
                    React Hook Form
                </MUI.Typography>
                {fields.map((name) => (
                    <PersonField
                        control={form.control}
                        errors={form.errors}
                        key={name}
                        name={name}
                        register={form.register}
                    />
                ))}
                <MUI.Button color="secondary" type="submit" variant="contained">
                    Submit
                </MUI.Button>
            </MUI.Box>
            <MUI.Typography>
                #Renders :<b>{renders.current}</b>
            </MUI.Typography>
        </form>
    );
};

const PersonField: React.VFC<{
    control: RHF.Control;
    errors: RHF.FieldErrors;
    name: keyof PersonType;
    register: any;
}> = (props) => {
    const field = Person.shape[props.name];
    const controller = RHF.useController(props);
    if (isStringField(field)) {
        return (
            <MUI.FormControl key={props.name}>
                <MUI.InputLabel
                    htmlFor={props.name}
                    error={controller.meta.invalid}
                >
                    {props.name}
                </MUI.InputLabel>
                <MUI.Input
                    error={controller.meta.invalid}
                    id={props.name}
                    inputRef={props.register}
                    name={props.name}
                />
                <DisplayError errors={props.errors} name={props.name} />
            </MUI.FormControl>
        );
    }
    if (isNumberField(field)) {
        return (
            <MUI.FormControl key={props.name}>
                <MUI.InputLabel
                    htmlFor={props.name}
                    error={controller.meta.invalid}
                >
                    {props.name}
                </MUI.InputLabel>
                <MUI.Input
                    error={controller.meta.invalid}
                    id={props.name}
                    name={props.name}
                    type="number"
                    inputRef={props.register({ valueAsNumber: true })}
                />
                <DisplayError errors={props.errors} name={props.name} />
            </MUI.FormControl>
        );
    }
    if (isEnumField(field)) {
        return (
            <MUI.FormControl component="fieldset">
                <MUI.FormLabel
                    component="legend"
                    error={controller.meta.invalid}
                >
                    {props.name}
                </MUI.FormLabel>
                <MUI.RadioGroup {...controller.field} id={props.name}>
                    {field.options.map((option) => (
                        <MUI.FormControlLabel
                            control={<MUI.Radio />}
                            key={option}
                            label={option}
                            value={option}
                        />
                    ))}
                </MUI.RadioGroup>
                <DisplayError errors={props.errors} name={props.name} />
            </MUI.FormControl>
        );
    }
    throw new Error(`Unknown field type : ${field}`);
};

const isStringField = (field: any): field is Zod.ZodString => {
    return field instanceof Zod.ZodString;
};

const isNumberField = (field: any): field is Zod.ZodNumber => {
    return field instanceof Zod.ZodNumber;
};

const isEnumField = (field: any): field is Zod.ZodEnum<any> => {
    return field instanceof Zod.ZodEnum;
};

const useErrorStyle = MUI.makeStyles({
    error: {
        position: "absolute",
        bottom: 0,
    },
    placeholder: {
        height: "20px",
    },
});

const DisplayError: React.VFC<{
    errors: RHF.DeepMap<Record<string, any>, RHF.FieldError>;
    name: keyof PersonType;
}> = (props) => {
    const classes = useErrorStyle();
    return (
        <>
            <div className={classes.placeholder} />
            <div className={classes.error}>
                <ErrorMessage
                    {...props}
                    render={({ message }) => (
                        <MUI.FormHelperText error>{message}</MUI.FormHelperText>
                    )}
                />
            </div>
        </>
    );
};
