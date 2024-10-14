import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to your data file
const filePath = path.join(process.cwd(), 'src', 'app', 'api', 'chatbot', 'data.js');

// Function to handle POST request
export async function POST(req: Request) {
  try {
    const newProject = await req.json();

    // Read the current data from the file
    let fileContent;
    try {
      fileContent = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error('Error reading data:', error);
      return NextResponse.json({ message: 'Failed to read project data.' }, { status: 500 });
    }

    // Extract the projectData array from the data.js file
    let projectData;
    try {
      const match = fileContent.match(/const projectData = (\[.*\]);/s);
      if (!match) {
        console.error('Error parsing project data: No match found');
        return NextResponse.json({ message: 'Failed to parse project data.' }, { status: 500 });
      }
      projectData = eval(match[1]); // Safely extract projectData array
    } catch (error) {
      console.error('Error parsing project data:', error);
      return NextResponse.json({ message: 'Failed to parse project data.' }, { status: 500 });
    }

    // Determine the next project_id
    const nextProjectId = projectData.length > 0 ? Math.max(...projectData.map(p => p.project_id)) + 1 : 1;

    // Add the new project to the array
    const updatedProject = {
      project_id: nextProjectId,
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies,
      url: newProject.url,
      imageUrl: newProject.imageUrl,
      startdate: newProject.startdate,
      enddate: newProject.enddate,
      maxbounty: newProject.maxbounty,
      critical: newProject.critical,
      high: newProject.high,
      low: newProject.low,
      tags: newProject.tags,
    };

    projectData.push(updatedProject);

    // Write the updated projectData array back into the data.js file
    const updatedContent = `
const projectData = ${JSON.stringify(projectData, null, 2)};

export { projectData };
    `;

    try {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      return NextResponse.json({ message: 'Project added successfully!', project_id: nextProjectId }, { status: 200 });
    } catch (error) {
      console.error('Error writing updated data to file:', error);
      return NextResponse.json({ message: 'Failed to save project data.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Error saving project.' }, { status: 500 });
  }
}
