import styled from "styled-components";

const NoteMessage = styled.div`
    background-color: #5f5f5feb; /* Light bright background */
    color: #ffffff; /* Dark red text for contrast */
    padding: 15px;
    border-left: 5px solid #ff4c4c; /* Red left border for emphasis */
    font-size: 16px;
    line-height: 1.6;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 757px;

    a {
        color: #ffffff;
        font-weight: bold;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`;

const Note = () => {
    return (
        <NoteMessage>
            ⚠️ <strong>Important Notice:</strong>
            <br />
            This website links to an old YouTube account to prevent unauthorized
            uploads or deletions.
            <br />
            It is intended <strong>only for viewing</strong> and to give a brief
            overview of my work.
            <br />
            <br />
            Visit the automated YouTube channel here
            <br />
            👉{" "}
            <a
                href="https://www.youtube.com/@RedditorsDiary"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://www.youtube.com/@RedditorsDiary
            </a>
        </NoteMessage>
    );
};

export default Note;
