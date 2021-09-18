import axios from "axios";

type Props = {
  uploaded: (url: string) => void;
};

const ImageUpload: React.FC<Props> = ({ uploaded }) => {
  const upload = async (files: FileList | null) => {
    if (files === null) return;

    const formData = new FormData();
    formData.append("image", files[0]);
    const { data } = await axios.post("upload", formData);

    uploaded(data.url);
  };

  return (
    <label className="btn btn-primary">
      Upload{" "}
      <input type="file" hidden onChange={(e) => upload(e.target.files)} />
    </label>
  );
};

export default ImageUpload;
