interface ErrorInterface {
  title: string | null;
  description: string | null;
}

const ReportFormValidator = (value: any) => {
  const error: ErrorInterface = {
    title: null,
    description: null,
  };
  if (value.title === "") error.title = "Title is required";
  if (value.description === "") error.description = "Description is required";
  return error;
};

export default ReportFormValidator;
