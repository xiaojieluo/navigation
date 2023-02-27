import theme from "@/Theme";
import { ThemeProvider } from "@emotion/react";
import {
    Box,
    Button,
    Chip,
    Container,
    CssBaseline,
    Grid,
    ListItem,
    TextField,
    Typography,
    useFormControl,
} from "@mui/material";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

interface ChipData {
    name: string;
}

function Create() {
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const [chipData, setChipData] = useState<ChipData[]>([]);
    const [tagValue, setTagValue] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");
    };

    const handleDelete = (chipToDelete: ChipData) => {
        setChipData((chips) =>
            chips.filter((chip) => chip.name !== chipToDelete.name)
        );
    };

    const chip = () => {
        return chipData.map((data) => {
            return (
                <Chip
                    sx={{
                        mr: 1,
                    }}
                    key={data.name}
                    label={data.name}
                    onDelete={(e) => {
                        handleDelete(data);
                    }}
                />
            );
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <ToastContainer />

                <Box
                    sx={{
                        marginTop: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        添加新网站
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ mt: 3 }}
                        onSubmit={handleSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Url"
                                    required
                                    fullWidth
                                    id="url"
                                    label="Url"
                                    value={url}
                                    onChange={(event) =>
                                        setUrl(event.currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="desc"
                                    required
                                    fullWidth
                                    id="desc"
                                    label="desc"
                                    multiline
                                    rows={3}
                                    value={desc}
                                    onChange={(event) =>
                                        setDesc(event.currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="tags"
                                    required
                                    fullWidth
                                    id="tags"
                                    label="Tags"
                                    value={tagValue}
                                    onChange={(event) => {
                                        const value = event.currentTarget.value;
                                        const index = value.indexOf(",");

                                        if (index > 0) {
                                            let tag = value.substring(0, index);
                                            setChipData((chip) => [
                                                ...chip,
                                                { name: tag },
                                            ]);
                                            setTagValue("");
                                        } else {
                                            setTagValue(value);
                                        }
                                    }}
                                    InputProps={{
                                        startAdornment: chip(),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mv: 2 }}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Create;
