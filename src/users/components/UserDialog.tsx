import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { User } from "../types/user";

const genders = [
  { label: "userManagement.form.gender.options.f", value: "F" },
  { label: "userManagement.form.gender.options.m", value: "M" },
  { label: "userManagement.form.gender.options.n", value: "NC" },
];
const roles = ["Admin", "Member"];

type UserDialogProps = {
  onAdd: (user: Partial<User>) => void;
  onClose: () => void;
  onUpdate: (user: User) => void;
  open: boolean;
  processing: boolean;
  user?: User;
};

const UserDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  user,
}: UserDialogProps) => {
  const { t } = useTranslation();

  const editMode = Boolean(user && user.id);

  const handleSubmit = (values: Partial<User>) => {
    if (user && user.id) {
      onUpdate({ ...values, id: user.id } as User);
    } else {
      onAdd(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      disabled: user ? user.disabled : false,
      email: user ? user.email : "",
      firstName: user ? user.firstName : "",
      gender: user ? user.gender : "F",
      lastName: user ? user.lastName : "",
      role: user ? user.role : "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("common.validations.email"))
        .required(t("common.validations.required")),
      firstName: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .required(t("common.validations.required")),
      lastName: Yup.string()
        .max(30, t("common.validations.max", { size: 30 }))
        .required(t("common.validations.required")),
      role: Yup.string().required(t("common.validations.required")),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="user-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="user-dialog-title">
          {editMode
            ? t("userManagement.modal.edit.title")
            : t("userManagement.modal.add.title")}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label={t("userManagement.form.lastName.label")}
            name="lastName"
            autoComplete="family-name"
            autoFocus
            disabled={processing}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label={t("userManagement.form.firstName.label")}
            name="firstName"
            autoComplete="given-name"
            disabled={processing}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              {t("userManagement.form.gender.label")}
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              {genders.map((gender) => (
                <FormControlLabel
                  key={gender.value}
                  disabled={processing}
                  value={gender.value}
                  control={<Radio />}
                  label="gender"
                />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("userManagement.form.email.label")}
            name="email"
            autoComplete="email"
            disabled={processing}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            id="role"
            disabled={processing}
            fullWidth
            select
            label={t("userManagement.form.role.label")}
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              name="disabled"
              disabled={processing}
              onChange={formik.handleChange}
              checked={formik.values.disabled}
              control={<Checkbox />}
              label="deneme"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("common.cancel")}</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode
              ? t("userManagement.modal.edit.action")
              : t("userManagement.modal.add.action")}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;
